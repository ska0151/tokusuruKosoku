'use client';

import React, { useRef, useState } from 'react';
import { RouteResult } from '@/lib/api-client';
import { formatCurrency, formatDuration, formatSavings, formatTimeDifference } from '@/lib/format-utils';

interface RouteComparisonProps {
  routes: RouteResult[];
  onRouteSelect: (route: RouteResult) => void;
  onNavigateToMaps: (route: RouteResult) => void;
}

export const RouteComparison: React.FC<RouteComparisonProps> = ({
  routes,
  onRouteSelect,
  onNavigateToMaps,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<RouteResult | null>(routes[0] || null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getRouteColor = (index: number): string => {
    const colors = ['bg-blue-100 border-blue-400', 'bg-green-100 border-green-400', 'bg-yellow-100 border-yellow-400'];
    return colors[index] || 'bg-gray-100 border-gray-400';
  };

  const getRouteBadge = (index: number): string => {
    const badges = ['🔵 最速', '🟢 バランス', '🟡 最安'];
    return badges[index] || '★ その他';
  };

  return (
    <div className="w-full">
      {/* ヘッダー */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {routes[0]?.entryIC?.name} → {routes[0]?.exitIC?.name}
        </h2>
        <p className="text-sm text-gray-600">3 つのルートから選択</p>
      </div>

      {/* カード表示エリア */}
      <div className="relative">
        {/* スクロール矢印 */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg hidden md:block"
          aria-label="Left scroll"
        >
          ◀
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 md:pb-0"
          style={{ scrollBehavior: 'smooth' }}
        >
          {routes.map((route, index) => (
            <div
              key={route.routeId}
              onClick={() => {
                setSelectedRoute(route);
                onRouteSelect(route);
              }}
              className={`flex-shrink-0 w-full sm:w-80 p-6 rounded-lg border-2 cursor-pointer transition-all ${getRouteColor(index)} ${
                selectedRoute?.routeId === route.routeId ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
            >
              {/* バッジ */}
              <div className="text-lg font-bold mb-4">{getRouteBadge(index)}</div>

              {/* 主要情報 */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">所要時間</p>
                    <p className="text-3xl font-bold text-gray-800">{formatDuration(route.duration)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">料金</p>
                    <p className="text-3xl font-bold text-gray-800">{formatCurrency(route.discountedToll)}</p>
                  </div>
                </div>

                {/* 基準比較 */}
                {index > 0 && (
                  <div className="bg-white bg-opacity-70 p-3 rounded flex justify-between text-sm">
                    <span className="text-gray-700">
                      時間差: <span className="font-semibold">{formatTimeDifference(route.durationVsReference)}</span>
                    </span>
                    <span className="text-gray-700">
                      料金差: <span className="font-semibold">{formatSavings(route.savingsVsReference)}</span>
                    </span>
                  </div>
                )}

                <div className="text-xs text-gray-600">
                  距離: {route.distance.toFixed(1)} km
                  {route.baseToll !== route.discountedToll && (
                    <span className="ml-2 text-green-600 font-semibold">
                      ETC 割引適用中 ({formatCurrency(route.baseToll - route.discountedToll)} OFF)
                    </span>
                  )}
                </div>
              </div>

              {/* アクション */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToMaps(route);
                }}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Google Maps で開く
              </button>
            </div>
          ))}
        </div>

        {/* スクロール矢印（右） */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg hidden md:block"
          aria-label="Right scroll"
        >
          ▶
        </button>
      </div>

      {/* 選択ルートの詳細情報カード */}
      {selectedRoute && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold mb-4 text-gray-800">{selectedRoute.name} - 詳細</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">距離</p>
              <p className="text-lg font-semibold text-gray-800">{selectedRoute.distance.toFixed(1)} km</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">所要時間</p>
              <p className="text-lg font-semibold text-gray-800">{formatDuration(selectedRoute.duration)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">基本料金</p>
              <p className="text-lg font-semibold text-gray-800">{formatCurrency(selectedRoute.baseToll)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">割引後料金</p>
              <p className="text-lg font-semibold text-green-600">{formatCurrency(selectedRoute.discountedToll)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
