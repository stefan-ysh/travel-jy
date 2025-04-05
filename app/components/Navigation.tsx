'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: '首页', href: '/' },
  { name: '交通指南', href: '/#transportation-guide' },
  { name: '红黑榜', href: '/#red-black-list' },
  { name: '景点', href: '/attractions' },
  { name: '美食', href: '/food' },
  { name: '文化', href: '/culture' },
  { name: '打卡拍照点', href: '/checkin' },
  // { name: '路线', href: '/routes' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-600">丹东旅游</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">打开主菜单</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden transform transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/#transportation-guide"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                交通指南
              </Link>
              <Link
                href="/#red-black-list"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                红黑榜 / 踩坑提醒
              </Link>
              <Link
                href="/checkin"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                打卡点
              </Link>
              <Link
                href="/attractions"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                景点
              </Link>
              <Link
                href="/food"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                美食
              </Link>
              <Link
                href="/culture"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                文化
              </Link>
              <Link
                href="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                关于
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 