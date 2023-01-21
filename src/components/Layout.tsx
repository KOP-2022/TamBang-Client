interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto max-w-lg shadow-lg relative h-screen">
      {children}
    </div>
  );
};

export default Layout;
