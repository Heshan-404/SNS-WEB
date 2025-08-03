import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-lg w-full transform transition-all duration-500 hover:scale-105">
        <Image
          src="/images/props/logo.png"
          alt="SNS Logo"
          width={150}
          height={150}
          className="mx-auto mb-6 animate-bounce-slow"
        />
        <h1 className="text-7xl font-extrabold text-indigo-700 mb-4 animate-fade-in">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in animation-delay-200">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-fade-in animation-delay-400">
          Oops! The page you&apos;re looking for seems to have vanished into the digital ether. It
          might have been moved, deleted, or never existed.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 animate-fade-in animation-delay-600"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
