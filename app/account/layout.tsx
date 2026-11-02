import SideNavigation from "@/components/SideNavigation";

type AccountLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:h-full md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
      <SideNavigation />
      <div className="min-w-0 py-1">{children}</div>
    </div>
  );
}
