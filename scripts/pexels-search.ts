#!/usr/bin/env npx ts-node
/**
 * Pexels Stock Media Search CLI
 *
 * Usage:
 *   npx ts-node scripts/pexels-search.ts photos "AI technology"
 *   npx ts-node scripts/pexels-search.ts videos "abstract technology"
 *
 * Environment:
 *   PEXELS_API_KEY - Your Pexels API key (get free at https://www.pexels.com/api/)
 */

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
  };
  alt: string;
}

interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  duration: number;
  user: { name: string };
  video_files: Array<{
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    link: string;
  }>;
}

async function searchPhotos(query: string, perPage = 10): Promise<PexelsPhoto[]> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;

  const response = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY! },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status}`);
  }

  const data = await response.json();
  return data.photos;
}

async function searchVideos(query: string, perPage = 10): Promise<PexelsVideo[]> {
  const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;

  const response = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY! },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status}`);
  }

  const data = await response.json();
  return data.videos;
}

async function main() {
  const [, , type, ...queryParts] = process.argv;
  const query = queryParts.join(' ');

  if (!PEXELS_API_KEY) {
    console.error('Error: PEXELS_API_KEY environment variable not set');
    console.error('Get a free API key at: https://www.pexels.com/api/');
    process.exit(1);
  }

  if (!type || !query) {
    console.log('Usage: pexels-search.ts <photos|videos> <search query>');
    console.log('');
    console.log('Examples:');
    console.log('  npx ts-node scripts/pexels-search.ts photos "AI technology"');
    console.log('  npx ts-node scripts/pexels-search.ts videos "abstract data"');
    process.exit(1);
  }

  console.log(`\nSearching Pexels ${type} for: "${query}"\n`);

  if (type === 'photos') {
    const photos = await searchPhotos(query);
    console.log(`Found ${photos.length} photos:\n`);

    photos.forEach((photo, i) => {
      console.log(`${i + 1}. ${photo.alt || 'Untitled'}`);
      console.log(`   Photographer: ${photo.photographer}`);
      console.log(`   Size: ${photo.width}x${photo.height}`);
      console.log(`   Preview: ${photo.src.large}`);
      console.log(`   Download: ${photo.src.original}`);
      console.log(`   Page: ${photo.url}`);
      console.log('');
    });
  } else if (type === 'videos') {
    const videos = await searchVideos(query);
    console.log(`Found ${videos.length} videos:\n`);

    videos.forEach((video, i) => {
      const hdFile = video.video_files.find(f => f.quality === 'hd') || video.video_files[0];
      console.log(`${i + 1}. Video by ${video.user.name}`);
      console.log(`   Duration: ${video.duration}s`);
      console.log(`   Size: ${video.width}x${video.height}`);
      console.log(`   Download (${hdFile?.quality}): ${hdFile?.link}`);
      console.log(`   Page: ${video.url}`);
      console.log('');
    });
  } else {
    console.error('Error: Type must be "photos" or "videos"');
    process.exit(1);
  }
}

main().catch(console.error);
