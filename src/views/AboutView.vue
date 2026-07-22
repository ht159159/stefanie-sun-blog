<template>
  <main class="page">
    <div class="page__hero">
      <img src="https://picsum.photos/seed/about/1200/400" alt="About" />
      <div class="page__hero-overlay">
        <h1>About</h1>
      </div>
    </div>
    <div class="page__content">
      <section class="about-section">
        <div class="about-section__image">
          <img src="https://picsum.photos/seed/about2/500/600" alt="Stefanie Sun" />
        </div>
        <div class="about-section__text">
          <h2>{{ $t('about.name') }}</h2>
          <h3>{{ $t('about.subtitle') }}</h3>
          <p>{{ $t('about.bio1') }}</p>
          <p>{{ $t('about.bio2') }}</p>
          <p>{{ $t('about.bio3') }}</p>
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.page {
  padding-top: $header-height;

  &__hero {
    position: relative;
    height: 400px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-overlay {
      position: absolute;
      inset: 0;
      background: rgba($black, 0.5);
      @include flex-center;

      h1 {
        font-family: $font-serif;
        font-size: clamp(2rem, 5vw, 4rem);
        color: $white;
        letter-spacing: 0.1em;
      }
    }
  }

  &__content {
    @include container;
    padding-top: 80px;
    padding-bottom: 80px;
  }
}

.about-section {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 64px;
  align-items: start;

  @include respond-to(mobile) {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  &__image img {
    width: 100%;
    height: 500px;
    object-fit: cover;

    @include respond-to(mobile) {
      height: 320px;
    }
  }

  &__text {
    h2 {
      font-family: $font-serif;
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: 4px;
    }

    h3 {
      font-size: 1.1rem;
      color: $primary;
      font-weight: 400;
      margin-bottom: 32px;
      letter-spacing: 0.05em;
    }

    p {
      font-size: 1rem;
      color: $text-body;
      line-height: 1.9;
      margin-bottom: 20px;
    }
  }
}
</style>
