'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ArrowLeft from '@/components/icon/ArrowLeft';

export default function NotFound() {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen text-center px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.h1
        className="text-6xl font-bold text-gray-900 mb-2"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        404
      </motion.h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">ไม่พบหน้านี้</h2>

      <p className="text-gray-600 text-lg mb-8">
        ขออภัย หน้าที่คุณค้นหาอาจถูกลบ หรือไม่เคยมีอยู่จริง
      </p>

      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
      >
        <ArrowLeft fill="white" className="w-5 h-5" />
        กลับหน้าแรก
      </button>
    </motion.div>
  );
}
