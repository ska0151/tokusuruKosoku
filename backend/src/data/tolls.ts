/**
 * 料金セグメントデータ（MVP 版・簡易料金表）
 * 首都圏主要ルート約 30 区間
 */
export const TOLL_SEGMENTS = [
  // 首都内短距離
  { fromIcId: 'SH001', toIcId: 'SH002', distance: 8.5, baseToll: 1200 },
  { fromIcId: 'SH001', toIcId: 'SH003', distance: 5.2, baseToll: 1050 },
  { fromIcId: 'SH002', toIcId: 'SH003', distance: 4.8, baseToll: 950 },
  { fromIcId: 'SH001', toIcId: 'SH004', distance: 12.3, baseToll: 1500 },
  { fromIcId: 'SH003', toIcId: 'SH004', distance: 8.1, baseToll: 1250 },

  // 首都高～東名（横浜方向）
  { fromIcId: 'SH001', toIcId: 'TM003', distance: 45.2, baseToll: 2650 },
  { fromIcId: 'SH002', toIcId: 'TM003', distance: 42.8, baseToll: 2450 },
  { fromIcId: 'SH001', toIcId: 'TM004', distance: 78.5, baseToll: 4200 },
  { fromIcId: 'TM001', toIcId: 'TM003', distance: 25.1, baseToll: 1750 },
  { fromIcId: 'TM003', toIcId: 'TM004', distance: 38.2, baseToll: 2200 },

  // 東名高速長距離（名古屋・大阪方向）
  { fromIcId: 'TM001', toIcId: 'TM005', distance: 412.5, baseToll: 7100 },
  { fromIcId: 'TM003', toIcId: 'TM005', distance: 395.2, baseToll: 6850 },
  { fromIcId: 'TM004', toIcId: 'TM005', distance: 362.1, baseToll: 6400 },

  // 中央道
  { fromIcId: 'SH001', toIcId: 'CD001', distance: 56.3, baseToll: 3100 },
  { fromIcId: 'CD001', toIcId: 'CD002', distance: 125.4, baseToll: 4500 },

  // 外環道
  { fromIcId: 'SH001', toIcId: 'GW001', distance: 58.2, baseToll: 3200 },
  { fromIcId: 'GW001', toIcId: 'GW002', distance: 34.1, baseToll: 2100 },
  { fromIcId: 'GW002', toIcId: 'GW003', distance: 12.8, baseToll: 950 },

  // 湾岸道
  { fromIcId: 'SH001', toIcId: 'BY001', distance: 32.5, baseToll: 1850 },
  { fromIcId: 'BY001', toIcId: 'BY002', distance: 68.2, baseToll: 3400 },
  { fromIcId: 'SH001', toIcId: 'BY002', distance: 98.1, baseToll: 4800 },

  // 名神高速（京都・大阪方向）
  { fromIcId: 'TM001', toIcId: 'MS002', distance: 512.3, baseToll: 9200 },
  { fromIcId: 'MS001', toIcId: 'MS002', distance: 78.4, baseToll: 2950 },
  { fromIcId: 'MS002', toIcId: 'MS003', distance: 87.5, baseToll: 3150 },
  { fromIcId: 'MS001', toIcId: 'MS003', distance: 165.9, baseToll: 5400 },

  // 横浜方向
  { fromIcId: 'SH001', toIcId: 'SH008', distance: 65.3, baseToll: 3600 },
  { fromIcId: 'TM003', toIcId: 'SH008', distance: 28.5, baseToll: 1650 },
  { fromIcId: 'SH007', toIcId: 'SH008', distance: 12.2, baseToll: 950 },

  // 成田方向
  { fromIcId: 'SH001', toIcId: 'GW001', distance: 58.2, baseToll: 3200 },

  // その他主要ルート
  { fromIcId: 'TM001', toIcId: 'TM002', distance: 18.5, baseToll: 1350 },
  { fromIcId: 'TM002', toIcId: 'TM003', distance: 15.2, baseToll: 1200 },
];
