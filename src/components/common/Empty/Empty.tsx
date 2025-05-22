'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ShoppingCartIcon className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">ตะกร้าว่างเปล่า</h2>
      <p className="text-gray-600 mb-6">ยังไม่มีสินค้าในตะกร้า</p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl shadow hover:bg-gray-800 transition"
      >
        เลือกซื้อสินค้าต่อ
      </Link>
    </motion.div>
  );
}
