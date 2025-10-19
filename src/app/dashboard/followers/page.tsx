"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserPlus, UserMinus, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { toast } from "sonner";

type User = {
  _id: Id<"users">;
  name: string;
  username?: string;
  imageUrl?: string;
  followsBack?: boolean;
};

type UserCardProps = {
  user: User;
  isLoading?: boolean;
  variant?: "follower" | "following";
  onToggle: (userId: Id<"users">) => void;
};

const UserCard = ({
  user,
  isLoading = false,
  variant = "follower",
  onToggle,
}: UserCardProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
      {/* Avatar + Info */}
      <div className="flex items-center space-x-3">
        <Link href={`/${user.username}`}>
          <div className="relative w-10 h-10 cursor-pointer">
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.name}
                fill
                className="rounded-full object-cover"
                sizes="40px"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </Link>
        <Link href={user.username ? `/${user.username}` : ""}>
          <div className="cursor-pointer">
            <p className="font-medium text-white hover:text-purple-300">
              {user.name}
            </p>
            {user.username && (
              <p className="text-sm text-slate-400">@{user.username}</p>
            )}
          </div>
        </Link>
      </div>

      {/* Action Button */}
      {variant === "follower" ? (
        !user.followsBack && (
          <Button
            onClick={() => onToggle(user._id)}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-1" />
                Follow Back
              </>
            )}
          </Button>
        )
      ) : (
        <Button
          onClick={() => onToggle(user._id)}
          disabled={isLoading}
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-red-400"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <UserMinus className="h-4 w-4 mr-1" />
              Unfollow
            </>
          )}
        </Button>
      )}
    </div>
  );
};

const FollowersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Data fetching
  const { data: followers, isLoading: followersLoading } = useConvexQuery(
    api.follows.getMyFollowers,
    { limit: 100 }
  ) as {
    data: User[] | undefined;
    isLoading: boolean;
    error: Error | null;
  };

  const { data: following, isLoading: followingLoading } = useConvexQuery(
    api.follows.getMyFollowing,
    { limit: 100 }
  ) as {
    data: User[] | undefined;
    isLoading: boolean;
    error: Error | null;
  };

  // Mutations
  const { mutate: toggleFollow, isLoading: isToggling } = useConvexMutation(
    api.follows.toggleFollow
  );

  // Handle follow/unfollow
  const handleFollowToggle = async (userId: Id<"users">) => {
    try {
      await toggleFollow({ followingId: userId });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update follow status"
      );
    }
  };

  // Filter users based on search
  const filterUsers = (users: User[] | undefined): User[] => {
    if (!searchQuery.trim()) return users || [];

    return (users || []).filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filteredFollowers = filterUsers(followers);
  const filteredFollowing = filterUsers(following);

  const isLoading = followersLoading || followingLoading;

  return (
    <div className="space-y-6 p-4 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text-primary">
          Followers & Following
        </h1>
        <p className="text-slate-400 mt-2">
          Manage your connections and discover new creators
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search users..."
          className="pl-10 bg-slate-800 border-slate-600"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="followers" className="">
        <TabsList className="grid w-full grid-cols-2 bg-slate-900">
          <TabsTrigger value="followers" className="">
            Followers ({filteredFollowers.length})
          </TabsTrigger>
          <TabsTrigger value="following" className="">
            Following ({filteredFollowing.length})
          </TabsTrigger>
        </TabsList>

        {/* Followers Tab */}
        <TabsContent value="followers" className="mt-6">
          {filteredFollowers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              variant="follower"
              isLoading={isToggling}
              onToggle={handleFollowToggle}
            />
          ))}
        </TabsContent>

        {/* Following Tab */}
        <TabsContent value="following" className="mt-6">
          {filteredFollowing.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              variant="following"
              isLoading={isToggling}
              onToggle={handleFollowToggle}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FollowersPage;
