import React from 'react';

type Props = {
  iconName: string;   // 图标名称（对应SVG文件名）
  size?: number;      // 图标尺寸
  type?: 'primary' | 'danger' | 'disabled'; // 颜色类型
  className?: string; // 自定义类名
};


export default function SvgIcon({ iconName, size = 24, type = 'primary', className }: Props) {
  // 根据类型获取颜色
  const getColor = (type: string) => {
    switch (type) {
      case 'primary': return '#1890ff';
      case 'danger': return '#ff4d4f';
      default: return '#999';
    }
  };

  return (
    <svg
      className={`svg-icon ${className}`}
      width={size}
      height={size}
      fill={getColor(type)}
    >
      {/* 通过use标签引用外部SVG */}
      <use xlinkHref={`#icon-${iconName}`} />
    </svg>
  );
};



