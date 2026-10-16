import PageMotion from '@/components/motion/PageMotion';

// Templates remount on every navigation, so page motion is set up fresh
// and fully reverted for each route.
export default function Template({ children }) {
  return <PageMotion>{children}</PageMotion>;
}
