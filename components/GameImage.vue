<template>
  <div 
    class="game-item deus_result deus_large"
    :class="{ 'image-loaded': isLoaded }"
    :style="containerStyle"
  >
    <img
      v-if="shouldLoadImage"
      :src="optimizedImageUrl"
      :alt="game.title"
      class="game-image"
      loading="lazy"
      @load="onImageLoad"
      @error="onImageError"
    />
    <div v-if="!isLoaded" class="image-placeholder" />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'GameImage',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoaded: false,
      isIntersecting: false,
      imageError: false,
      observer: null
    }
  },
  computed: {
    shouldLoadImage() {
      return this.isIntersecting && !this.imageError
    },
    containerStyle() {
      if (this.isLoaded) {
        return {
          backgroundImage: `url(${this.optimizedImageUrl})`,
          backgroundColor: this.imageError ? '#1c1d55' : 'transparent'
        }
      }
      return {
        backgroundColor: '#1c1d55'
      }
    },
    optimizedImageUrl() {
      if (!this.game.img_url) return ''
      
      // Si l'URL est déjà optimisée, la retourner telle quelle
      if (this.game.img_url.includes('img.deussearch.fr')) {
        return this.game.img_url
      }

      // Sinon, construire une URL optimisée via un proxy d'images
      const baseUrl = 'https://img.deussearch.fr/proxy'
      const encodedUrl = encodeURIComponent(this.game.img_url)
      return `${baseUrl}?url=${encodedUrl}&w=400&q=75&format=webp`
    }
  },
  mounted() {
    this.setupIntersectionObserver()
  },
  beforeDestroy() {
    this.destroyIntersectionObserver()
  },
  methods: {
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          this.isIntersecting = entry.isIntersecting
        },
        {
          rootMargin: '50px',
          threshold: 0.1
        }
      )
      this.observer.observe(this.$el)
    },
    destroyIntersectionObserver() {
      if (this.observer) {
        this.observer.disconnect()
        this.observer = null
      }
    },
    onImageLoad() {
      this.isLoaded = true
      this.imageError = false
    },
    onImageError() {
      this.imageError = true
      this.isLoaded = true
      console.warn(`Failed to load image for game: ${this.game.title}`)
    }
  }
}
</script>

<style scoped>
.game-item {
  position: relative;
  background-size: cover;
  background-position: center;
  transition: opacity 0.3s ease;
  contain: content;
  will-change: transform;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #1c1d55 25%, #2a2b6b 50%, #1c1d55 75%);
  background-size: 200% 200%;
  animation: shimmer 2s infinite;
  contain: strict;
}

.game-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-loaded .game-image {
  opacity: 1;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .image-placeholder {
    animation: none;
    background: #1c1d55;
  }
}
</style> 