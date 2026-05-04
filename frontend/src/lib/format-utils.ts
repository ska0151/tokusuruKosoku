/**
 * 秒を hh:mm 形式にフォーマット
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * 金額を通貨形式にフォーマット
 */
export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`;
}

/**
 * 距離をフォーマット
 */
export function formatDistance(km: number): string {
  return `${km.toFixed(1)} km`;
}

/**
 * 差分を表示用文字列にフォーマット
 */
export function formatSavings(amount: number): string {
  if (amount > 0) {
    return `△${Math.abs(amount).toLocaleString('ja-JP')}円`;
  } else if (amount < 0) {
    return `+${Math.abs(amount).toLocaleString('ja-JP')}円`;
  }
  return '同等';
}

/**
 * 時間差を表示用文字列にフォーマット
 */
export function formatTimeDifference(seconds: number): string {
  if (seconds > 0) {
    return `+${formatDuration(seconds)}`;
  } else if (seconds < 0) {
    return `-${formatDuration(Math.abs(seconds))}`;
  }
  return '同等';
}
