import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  main?: boolean;
}

const Layout = ({ children, title, main }: LayoutProps) => {
  return (
    <>
      <Header back={!main} title={title} />
      <div className="mx-auto max-w-lg shadow-lg relative h-screen pt-14 overflow-y-scroll">
        {children}
      </div>
    </>
  );
};

export default Layout;
