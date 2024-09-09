import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VendorModal } from './vendorModal';
import { Wrapper } from './wrapper';
import { Logo } from './logo';

interface AdminNavbarProps {
  toggleMobileSidebar: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ toggleMobileSidebar }) => {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.search?.value;
    if (!value) return;
    router.push(`/search?s=${value}`);
  };

  return (
    <Wrapper>
      <nav className="bg-white flex flex-wrap items-center justify-between gap-x-4 py-2">
        {/* Mobile Navbar */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center">
            <button onClick={toggleMobileSidebar} className="mr-2 lg:hidden">
              <Icon icon="heroicons-outline:menu" className="text-2xl" />
            </button>
            <Logo backGroundColor={''} />
          </div>
          <div className="flex items-center gap-4 lg:hidden">
            <NavbarIcons />
          </div>
        </div>
        {/* Form appears in both */}
        <form onSubmit={onSubmit} className="w-full md:flex-grow lg:max-w-xl relative mt-3 lg:mt-0">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="search product"
            className="w-full px-6 py-2 rounded-full outline-none bg-gray-100"
          />
          <button
            aria-label="search for product"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            type="submit"
          >
            <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
          </button>
        </form>
        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center gap-4">
          <NavbarIcons />
        </div>
      </nav>
    </Wrapper>
  );
};

const NavbarIcons: React.FC = () => {
  const [isVendorModalOpen, setVendorModalOpen] = useState(false);

  const openModal = () => setVendorModalOpen(true);
  const closeModal = () => setVendorModalOpen(false);

  return (
    <div className="flex gap-5 lg:gap-10 justify-between items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Icon icon="jam:write" style={{ fontSize: 24 }} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/dashboard/add-product">Edit Product</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/add-product">Edit Price</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openModal}>
            <span>Edit Vendor</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Icon icon="mdi:plus" className="rounded-full bg-app-ash" style={{ fontSize: 24 }} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/dashboard/add-product">Add Product</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openModal}>
            <span>Add Vendor</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/dashboard/settings" className="flex items-center gap-2">
        <Icon icon="mdi:account" style={{ fontSize: 24 }} />
        <span>User</span>
      </Link>

      {/* Vendor Modal */}
      <VendorModal isOpen={isVendorModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AdminNavbar;
