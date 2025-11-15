import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/app/blog/blogData";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg h-64 transition-transform hover:scale-[1.02]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/90 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white text-lg font-semibold">{post.title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
