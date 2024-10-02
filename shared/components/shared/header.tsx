import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { cn } from '@/shared/lib/utils';
import { CartButton } from './cart-button';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">the best pizza</p>
            </div>
          </div>
        </Link>

        {/* Search bar */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Login
          </Button>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
