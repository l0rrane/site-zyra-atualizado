import admin from 'firebase-admin';
import nodemailer from 'nodemailer';

// Inicializa o Firebase Admin de forma segura usando Variáveis de Ambiente
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // O replace garante que as quebras de linha da chave funcionem na Vercel
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req, res) {
  // Apenas aceita requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email } = req.body;

  try {
    // 1. Gera o link oficial de redefinição do Firebase
    const linkDeRecuperacao = await admin.auth().generatePasswordResetLink(email);

    // 2. Configura o envio de e-mail (Exemplo genérico, ajuste com os dados do seu e-mail)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Exemplo se for Gmail. Se for hostinger/outro, mude aqui.
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    // 3. Monta o e-mail customizado do Zyra
    const htmlDoEmail = `
      <div style="font-family: Arial, sans-serif; background-color: #0b0f14; color: #fff; padding: 40px; text-align: center; border-radius: 10px;">
        <h1 style="color: #a855f7;">ZYRA</h1>
        <p>Recebemos um pedido para redefinir a senha da sua conta.</p>
        <p>Clique no botão abaixo para criar uma nova senha:</p>
        <a href="${linkDeRecuperacao}" style="display: inline-block; padding: 15px 25px; background-color: #06b6d4; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">
          Redefinir Minha Senha
        </a>
      </div>
    `;

    // 4. Dispara o e-mail
    await transporter.sendMail({
      from: '"Suporte Zyra" <seu_email@zyra.com>',
      to: email,
      subject: "Recuperação de Senha - Zyra",
      html: htmlDoEmail
    });

    return res.status(200).json({ message: "Link enviado com sucesso!" });

  } catch (error) {
    console.error("Erro na API:", error);
    
    // Se o usuário não existir, retornamos sucesso falso por segurança
    if (error.code === 'auth/user-not-found') {
      return res.status(200).json({ message: "Se o e-mail existir, o link foi enviado." });
    }
    
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}