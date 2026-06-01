import admin from 'firebase-admin';
import nodemailer from 'nodemailer';

// Inicializa Firebase Admin apenas uma vez
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });

    console.log('Firebase Admin inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar Firebase Admin:', error);
  }
}

export default async function handler(req, res) {
  // Aceita apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Método não permitido',
    });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'E-mail é obrigatório',
      });
    }

    console.log('=== INÍCIO RECUPERAÇÃO DE SENHA ===');
    console.log('Email recebido:', email);

    console.log('Variáveis Firebase:');
    console.log({
      FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
      FIREBASE_CLIENT_EMAIL: !!process.env.FIREBASE_CLIENT_EMAIL,
      FIREBASE_PRIVATE_KEY: !!process.env.FIREBASE_PRIVATE_KEY,
    });

    console.log('Variáveis Email:');
    console.log({
      EMAIL_USER: !!process.env.EMAIL_USER,
      EMAIL_PASS: !!process.env.EMAIL_PASS,
    });

    // URL para onde o usuário será levado depois de redefinir a senha
    const actionCodeSettings = {
      url: 'https://zyrasystems.vercel.app/login',
      handleCodeInApp: false,
    };

    console.log('Gerando link de recuperação...');

    const linkDeRecuperacao =
      await admin.auth().generatePasswordResetLink(email, actionCodeSettings);

    console.log('Link gerado com sucesso:', linkDeRecuperacao);

    console.log('Configurando SMTP...');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS?.replace(/\s/g, ''),
      },
    });

    console.log('Validando SMTP...');
    await transporter.verify();
    console.log('SMTP validado com sucesso');

    const htmlDoEmail = `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #0b0f14;
        color: #ffffff;
        padding: 40px;
        text-align: center;
        border-radius: 10px;
      ">
        <h1 style="color: #a855f7; margin-bottom: 20px;">
          ZYRA
        </h1>

        <p style="font-size: 16px; line-height: 1.5;">
          Recebemos uma solicitação para redefinir a senha da sua conta.
        </p>

        <p style="font-size: 16px; line-height: 1.5;">
          Clique no botão abaixo para criar uma nova senha:
        </p>

        <a
          href="${linkDeRecuperacao}"
          target="_blank"
          rel="noopener noreferrer"
          style="
            display: inline-block;
            padding: 15px 25px;
            background: #06b6d4;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin-top: 20px;
          "
        >
          Redefinir Minha Senha
        </a>

        <p style="margin-top: 25px; font-size: 13px; color: #cccccc;">
          Se o botão não funcionar, copie e cole este link no navegador:
        </p>

        <p style="
          font-size: 12px;
          word-break: break-all;
          color: #06b6d4;
          background: #111827;
          padding: 12px;
          border-radius: 6px;
        ">
          ${linkDeRecuperacao}
        </p>

        <p style="margin-top: 20px; font-size: 12px; color: #999999;">
          Se você não solicitou esta alteração, ignore este e-mail.
        </p>
      </div>
    `;

    console.log('Enviando email...');

    const info = await transporter.sendMail({
      from: `"Suporte Zyra" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Recuperação de Senha - Zyra',
      html: htmlDoEmail,
    });

    console.log('Email enviado com sucesso');
    console.log('Message ID:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Link enviado com sucesso!',
    });

  } catch (error) {
    console.error('==============================');
    console.error('ERRO COMPLETO DA API');
    console.error('==============================');
    console.error(error);
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);

    // Não revela se o usuário existe ou não
    if (error.code === 'auth/user-not-found') {
      return res.status(200).json({
        success: true,
        message: 'Se o e-mail existir, o link foi enviado.',
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message || 'Erro interno do servidor',
      code: error.code || 'UNKNOWN_ERROR',
    });
  }}
