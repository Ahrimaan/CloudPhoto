<script lang="ts">
    import { onMount } from 'svelte';
  
    //TODO: GET RANDOM IMAGES FROM BACKEND
    const images = [
      'https://picsum.photos/seed/234346554/1280/800',
      'https://picsum.photos/seed/234141/1280/800',
      'https://picsum.photos/seed/56657/1280/800',
      'https://picsum.photos/seed/457886/1280/800',
      'https://picsum.photos/seed/3545223/1280/800',
    ];
  
    let currentIndex = $state(0);
  
    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
    }
  
    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
  
    // Auto-advance carousel
    onMount(() => {
      const interval = setInterval(nextImage, 5000);
      return () => clearInterval(interval);
    });
  </script>
  
  <div class="relative w-full h-[calc(100vh-4rem)]">
    <div class="absolute inset-0">
      {#each images as image, i}
        <div
          class="absolute inset-0 transition-opacity duration-500"
          style="opacity: {i === currentIndex ? '1' : '0'}"
        >
          <img
            src={image}
            alt="Carousel of images coming from random users"
            class="w-full h-full object-cover"
          />
        </div>
      {/each}
    </div>
  
    <button
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
      onclick={prevImage}
    >
      ←
    </button>
  
    <button
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
      onclick={nextImage}
    >
      →
    </button>
  
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {#each images as _, i}
        <button
          class="w-3 h-3 rounded-full {i === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'}"
          onclick={() => (currentIndex = i)}
          aria-label="Go to image {i + 1}"
        ></button>
      {/each}
    </div>
  </div>