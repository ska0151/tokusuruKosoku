/**
 * IC マスタデータ（首都圏重要IC）
 * MVP 段階では首都高速と主要幹線の約 30 IC
 */
export const IC_MASTERS = [
  // 首都高速
  { id: 'SH001', name: '渋谷出入口', lat: 35.6595, lng: 139.7004, operator: 'NEXCO-EAST', type: 'input_output' },
  { id: 'SH002', name: '品川出入口', lat: 35.6280, lng: 139.7391, operator: 'NEXCO-EAST', type: 'input_output' },
  { id: 'SH003', name: '六本木出入口', lat: 35.6653, lng: 139.7298, operator: 'NEXCO-EAST', type: 'input_output' },
  { id: 'SH004', name: '銀座出入口', lat: 35.6630, lng: 139.7652, operator: 'NEXCO-EAST', type: 'input_output' },
  { id: 'SH005', name: '入谷出入口', lat: 35.6950, lng: 139.7850, operator: 'NEXCO-EAST', type: 'input_output' },
  { id: 'SH006', name: '浅草出入口', lat: 35.7100, lng: 139.7950, operator: 'NEXCO-EAST', type: 'input_output' },

  // 東名高速
  { id: 'TM001', name: '東京IC', lat: 35.5895, lng: 139.7482, operator: 'NEXCO-CENTRAL', type: 'input_output' },
  { id: 'TM002', name: '横浜町田IC', lat: 35.5423, lng: 139.5345, operator: 'NEXCO-CENTRAL', type: 'input_output' },
  { id: 'TM003', name: '横浜IC', lat: 35.4437, lng: 139.6427, operator: 'NEXCO-CENTRAL', type: 'input_output' },
  { id: 'TM004', name: '厚木IC', lat: 35.2437, lng: 139.2127, operator: 'NEXCO-CENTRAL', type: 'input_output' },

  // 中央道
  { id: 'CD001', name: '高尾IC', lat: 35.6405, lng: 139.2827, operator: 'NEXCO-CENTRAL', type: 'input_output' },
  { id: 'CD002', name: '一宮IC', lat: 35.3103, lng: 138.1527, operator: 'NEXCO-CENTRAL', type: 'input_output' },

  // 外環道
  { id: 'GW001', name: '鎌ケ谷IC', lat: 35.8106, lng: 140.0627, operator: 'NEXCO-EAST', type: 'input_output' },
  { id: 'GW002', name: '三郷IC', lat: 35.8806, lng: 139.8827, operator: 'NEXCO-EAST', type: 'input_output' },
  { id: 'GW003', name: '川口JCT', lat: 35.8150, lng: 139.7227, operator: 'NEXCO-EAST', type: 'input_output' },

  // 常磐道
  { id: 'JB001', name: '日立南太田IC', lat: 36.5905, lng: 140.6127, operator: 'NEXCO-EAST', type: 'input_output' },

  // 湾岸道
  { id: 'BY001', name: '大黒PA/IC', lat: 35.4305, lng: 139.7627, operator: 'NEXCO-EAST', type: 'input_output' },
  { id: 'BY002', name: 'アクアライン木更津IC', lat: 35.1927, lng: 139.9727, operator: 'NEXCO-EAST', type: 'input_output' },

  // 東名阪道・勢田玉城道
  { id: 'TM005', name: '鈴鹿IC', lat: 34.7905, lng: 136.5427, operator: 'NEXCO-CENTRAL', type: 'input_output' },
  { id: 'TM006', name: '尾鷲IC', lat: 34.1805, lng: 136.2127, operator: 'NEXCO-CENTRAL', type: 'input_output' },

  // 名神高速
  { id: 'MS001', name: '大津IC', lat: 35.1105, lng: 135.8627, operator: 'NEXCO-WEST', type: 'input_output' },
  { id: 'MS002', name: '京都南IC', lat: 34.9435, lng: 135.7470, operator: 'NEXCO-WEST', type: 'input_output' },
  { id: 'MS003', name: '大阪IC', lat: 34.7405, lng: 135.4927, operator: 'NEXCO-WEST', type: 'input_output' },

  // 関西国際空港線
  { id: 'KA001', name: '泉佐野IC', lat: 34.4050, lng: 135.2427, operator: 'NEXCO-WEST', type: 'input_output' },

  // 首都圏その他
  { id: 'SH007', name: '横浜北IC', lat: 35.5705, lng: 139.6327, operator: 'NEXCO-EAST', type: 'input_output' },
  { id: 'SH008', name: '鎌倉IC', lat: 35.3140, lng: 139.5627, operator: 'NEXCO-EAST', type: 'input_output' },
];
