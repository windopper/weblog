'use client';

import { motion } from "motion/react";
import {
  SiLangchain,
  SiNextdotjs,
  SiVercel,
  SiVisx,
  SiD3Dotjs,
} from "react-icons/si";
import { SiSqlite, SiCloudflare, SiDrizzle, SiVitest } from "react-icons/si";

export default function TechStack() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="space-y-6"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col items-center justify-center"
      >
        <h3 className="text-lg font-medium mb-3 text-zinc-200">Frontend</h3>
        <div className="flex flex-wrap gap-2">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="px-3 py-1 rounded-md text-sm hover:text-[#000000] transition-colors duration-300"
          >
            <SiNextdotjs size={32} />
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
            className="px-3 py-1 rounded-md text-sm hover:text-[#000000] transition-colors duration-300"
          >
            <SiVercel size={32} />
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
            className="px-3 py-1 rounded-md text-sm hover:text-[#FF1231] transition-colors duration-300"
          >
            <SiVisx size={32} />
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="px-3 py-1 rounded-md text-sm hover:text-[#F9A03C] transition-colors duration-300"
          >
            <SiD3Dotjs size={32} />
          </motion.span>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col items-center justify-center"
      >
        <h3 className="text-lg font-medium mb-3 text-zinc-200">Backend</h3>
        <div className="flex flex-wrap gap-2">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
            className="px-3 py-1 rounded-md text-sm hover:text-[#1C3C3C] transition-colors duration-300"
          >
            <SiLangchain size={32} />
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="px-3 py-1 rounded-md text-sm hover:text-[#003B57] transition-colors duration-300"
          >
            <SiSqlite size={32} />
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="px-3 py-1 rounded-md text-sm hover:text-[#F38020] transition-colors duration-300"
          >
            <SiCloudflare size={32} />
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
            viewport={{ once: true, margin: "-50px" }}
            className="px-3 py-1 rounded-md text-sm hover:text-[#C5F74F] transition-colors duration-300"
          >
            <SiDrizzle size={32} />
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            className="px-3 py-1 rounded-md text-sm hover:text-[#6E9F18] transition-colors duration-300"
          >
            <SiVitest size={32} />
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
