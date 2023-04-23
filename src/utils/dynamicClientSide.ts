import dynamic from 'next/dynamic';

export default function dynamicClientSide(importFunction: () => Promise<any>, ssr = false) {
  return dynamic(importFunction, { ssr });
}
