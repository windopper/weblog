import { motion } from "motion/react";

export default function ArchitectureDescription() {
  return (
    <motion.div className="absolute top-0 let-0 flex flex-col gap-4 z-30"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    >
      <h2 className="text-2xl font-bold">SQLite</h2>
      <p className="text-sm text-zinc-300">
        SQLite is a lightweight, serverless database that is easy to use and
        deploy.
      </p>
    </motion.div>
  );
}