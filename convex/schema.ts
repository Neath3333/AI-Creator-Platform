import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { title } from "process";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        tokenIdentifier: v.string(), //clerk user for authentication
        image: v.optional(v.string()), //profile picture
        username: v.optional(v.string()), //unique username for public

        //Activity timestamp
        createdAt: v.number(),
        lastActiveAt: v.number(),
    })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"]) //Email Lookups
    .index("by_username", ["username"]) //Username lookups for public profile
    .searchIndex("search_name", {searchField:"name"})//User search
    .searchIndex("search_email", {searchField: "email"}), //Email search

    posts: defineTable({
        title: v.string(),
        content: v.string(), //Rich text content (JSON string or HTML)
        status: v.union(v.literal("draft"), v.literal("published")),

        //Author relationship
        authorId: v.id("users"),

        //Content metadata
        tags: v.array(v.string()),
        category: v.optional(v.string()), //Single category 
        featuredImage: v.optional(v.string()), //ImageKit URL

        //Timestamps
        createdAt: v.number(),
        updatedAt: v.number(),
        publishedAt: v.optional(v.number()),
        scheduledFor: v.optional(v.number()),

        //Analytics
        viewCount: v.number(),
        likeCount: v.number(),
    })

    .index("by_author", ["authorId"])
    .index("by_status" , ["status"])
    .index("by_published", ["status","publishedAt"])
    .index("by_author_status", ["authorId","status"])
    .searchIndex("search_content", { searchField:"title"}),

    comments:defineTable({
        postId: v.id("posts"),
        authorId: v.optional(v.id("users")), //optional for anonymous comments
        authorName: v.string(),//For Anonymous or display name
        authorEmail: v.optional(v.string()),// For anonymous comments

        contents: v.string(),
        status:v.union(
            v.literal("approved"),
            v.literal("pending"), 
            v.literal("rejected"),
        ),

        createdAt: v.number(),  
    })
    .index("by_post", ["postId"])
    .index("by_author", ["authorId"])
    .index("by_post_status", ["postId", "status"]),

    likes: defineTable({
        postId: v.id("posts"),
        userId: v.optional(v.id("users")), //optional for anonymous likes

        createAt: v.number(),
        })
        .index("by_post", ["postId"])
        .index("by_user", ["userId"])
        .index("by_post_user", ["postId", "userId"]), //Prevent duplicate likes 

        follows: defineTable({ 
            followerId:v.id("users"),// User doing the following
            followingId: v.id("users"), //User being followed

            createAt: v.number(),
        })
        .index("by_follower", ["followerId"])
        .index("by_following", ["followingId"])
        .index("by_relationship", ["followerId", "followingId"]), //Prevent duplicates


        dailyStats: defineTable({
            postId:v.id("posts"),
            date: v.string(), //YYYY-MM-DD format for easy querying
            view: v.number(),

            createdAt: v.number(),
            updatedAt: v.number(),

        })

        .index("by_post", ["postId"])
        .index("by_date", ["date"])
        .index("by_post_date",["postId", "date"]),
});