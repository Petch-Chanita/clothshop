'use client';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-md w-full text-center border border-gray-100">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 12 }}
        >
          <CheckCircleIcon className="text-green-500 w-20 h-20 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ขอบคุณสำหรับการสั่งซื้อ! 🎉</h1>
        <p className="text-gray-600 mb-6">คำสั่งซื้อของคุณถูกดำเนินการเรียบร้อยแล้ว</p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => router.push('/')}
          className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-800 transition"
        >
          กลับสู่หน้าหลัก
        </motion.button>
      </div>
    </motion.div>
  );
}
