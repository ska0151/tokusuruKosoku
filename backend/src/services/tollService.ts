import { TOLL_SEGMENTS } from '../data/tolls';

/**
 * 入口IC・出口ICの距離から基本料金を計算
 */
export function calculateToll(fromIcId: string, toIcId: string, distanceKm?: number): number {
  const segment = TOLL_SEGMENTS.find(
    s => s.fromIcId === fromIcId && s.toIcId === toIcId
  );

  if (segment) {
    return segment.baseToll;
  }

  // セグメント未定義の場合は距離から推定
  if (distanceKm) {
    // 簡易的な料金計算（距離 * 30円/km + 基本料金）
    return Math.ceil((distanceKm * 30 + 500) / 50) * 50;
  }

  return 0;
}

/**
 * ETC割引を適用
 */
export function applyETCDiscount(baseToll: number, hasETC: boolean, dateTime: Date): number {
  if (!hasETC) return baseToll;

  const dayOfWeek = dateTime.getDay();
  const hour = dateTime.getHours();
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

  // 平日 6:00-22:00 昼間割引 30%
  if (isWeekday && hour >= 6 && hour < 22) {
    return Math.floor(baseToll * 0.7);
  }

  // 夜間・休日 50%
  return Math.floor(baseToll * 0.5);
}
