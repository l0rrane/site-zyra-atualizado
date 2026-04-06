import { motion } from 'framer-motion';

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color,
}: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm relative group overflow-hidden h-full"
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 group-hover:opacity-60 transition-opacity bg-gradient-to-br ${color}`}
      />

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${color} text-white shadow-2xl relative z-10 group-hover:scale-110 transition-transform`}
      >
        <Icon size={32} />
      </div>

      <h3 className="text-2xl font-black text-white mb-4 tracking-tighter italic uppercase">
        {title}
      </h3>

      <p className="text-gray-400 leading-relaxed font-medium">
        {description}
      </p>

      <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
        Saiba Mais
      </div>
    </motion.div>
  );
};

export default FeatureCard;