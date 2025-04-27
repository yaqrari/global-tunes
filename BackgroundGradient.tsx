import React from 'react';

const BackgroundGradient = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-light opacity-95"></div>
      
      {/* Subtle radial gradients for more depth */}
      <div className="absolute top-0 left-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_top,_rgba(244,63,94,0.1),transparent_70%)]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_bottom,_rgba(15,29,94,0.2),transparent_70%)]"></div>
      
      {/* Subtle grain effect */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
    </div>
  );
};

export default BackgroundGradient;