'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
  onCLickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onCLickSignIn }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button onClick={onCLickSignIn} variant="outline" className="flex items-center gap-1">
          <User size={16} />
          Login
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Profile
          </Button>
        </Link>
      )}
    </div>
  );
};
