'use client';

import React, { useState, useEffect } from 'react';
import { searchRoutes, nearbyICs } from '@/lib/api-client';
import { RouteComparison } from '@/components/RouteComparison';

const DEFAULT_ORIGIN = { lat: 35.6762, lng: 139.7674 }; // 東京
const DEFAULT_DESTINATION = { lat: 34.6937, lng: 135.5023 }; // 京都

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [routes, setRoutes] = useState<any[] | null>(null);
  const [searchHistory, setSearchHistory] = useState<any[]>([]);

  // Form state
  const [vehicleType, setVehicleType] = useState<'light' | 'regular' | 'large'>('regular');
  const [hasETC, setHasETC] = useState(true);
  const [entryIcId, setEntryIcId] = useState('SH001'); // 渋谷
  const [exitIcId, setExitIcId] = useState('MS002'); // 京都南

  // IC リスト
  const [entryICs, setEntryICs] = useState<any[]>([]);
  const [exitICs, setExitICs] = useState<any[]>([]);

  // マウント時に初期化
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await nearbyICs(35.6762, 139.7674, 100);
        setEntryICs(data.ics || []);
        setExitICs(data.ics || []);
      } catch (err) {
        console.error('Failed to load IC list:', err);
      }
    };
    loadInitialData();

    // 検索履歴をロード
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchRoutes({
        origin: DEFAULT_ORIGIN,
        destination: DEFAULT_DESTINATION,
        entryIcId,
        exitIcId,
        vehicleType,
        hasETC,
        searchTime: new Date().toISOString(),
      });

      setRoutes(result.routes);

      // 検索履歴に追加
      const newHistory = [
        { entryIcId, exitIcId, timestamp: new Date().toLocaleString('ja-JP') },
        ...searchHistory.slice(0, 4),
      ];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (err: any) {
      setError(`検索に失敗しました: ${err?.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToMaps = (route: any) => {
    const url = `https://www.google.com/maps/dir/${route.entryIC.lat},${route.entryIC.lng}/${route.exitIC.lat},${route.exitIC.lng}`;
    window.open(url, '_blank');
  };

  if (routes) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">トクする高速</h1>
            <p className="text-lg text-gray-600">首都圏高速IC料金比較アプリ</p>
          </div>

          {/* ルート比較 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <RouteComparison
              routes={routes}
              onRouteSelect={() => {}}
              onNavigateToMaps={handleNavigateToMaps}
            />
          </div>

          {/* 戻るボタン */}
          <button
            onClick={() => setRoutes(null)}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            新しく検索する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">トクする高速</h1>
          <p className="text-xl text-gray-600">首都圏高速IC料金比較アプリ</p>
          <p className="text-sm text-gray-500 mt-2">複数ICの料金・時間を一瞬で比較</p>
        </div>

        {/* メインカード */}
        <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

          {/* 入口IC選択 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">入口IC</label>
            <select
              value={entryIcId}
              onChange={(e) => setEntryIcId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              {entryICs.map((ic) => (
                <option key={ic.id} value={ic.id}>
                  {ic.name} ({ic.operator})
                </option>
              ))}
            </select>
          </div>

          {/* 出口IC選択 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">出口IC</label>
            <select
              value={exitIcId}
              onChange={(e) => setExitIcId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              {exitICs.map((ic) => (
                <option key={ic.id} value={ic.id}>
                  {ic.name} ({ic.operator})
                </option>
              ))}
            </select>
          </div>

          {/* 車種選択 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">車種</label>
            <div className="flex gap-4">
              {(['light', 'regular', 'large'] as const).map((type) => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="vehicleType"
                    value={type}
                    checked={vehicleType === type}
                    onChange={(e) => setVehicleType(e.target.value as any)}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-gray-700">
                    {type === 'light' ? '軽' : type === 'regular' ? '普通' : '大型'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ETC有無 */}
          <div className="flex items-center gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hasETC}
                onChange={(e) => setHasETC(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="ml-2 text-lg text-gray-700 font-semibold">ETC 利用者</span>
            </label>
            {hasETC && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">割引対象</span>
            )}
          </div>

          {/* 検索ボタン */}
          <button
            onClick={handleSearch}
            disabled={loading}
            className={`w-full py-4 px-6 text-lg font-bold rounded-lg transition-all transform ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:scale-105'
            }`}
          >
            {loading ? '検索中...' : '🔍  料金を比較する'}
          </button>

          {/* 免責事項 */}
          <div className="bg-yellow-50 border-l-4 border-yellow-300 p-4 text-sm text-gray-700">
            <p className="font-semibold mb-1">⚠️ 注意</p>
            <p>このアプリケーションは検証版です。実走行時の最終判断は安全なドライバーご自身に基づいてください。</p>
          </div>
        </div>

        {/* 検索履歴 */}
        {searchHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">最近の検索</h3>
            <div className="space-y-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setEntryIcId(item.entryIcId);
                    setExitIcId(item.exitIcId);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 rounded border border-gray-200 text-sm text-gray-700 transition-colors"
                >
                  <span className="font-semibold">{item.entryIcId}</span> → <span className="font-semibold">{item.exitIcId}</span>
                  <span className="float-right text-xs text-gray-500">{item.timestamp}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
