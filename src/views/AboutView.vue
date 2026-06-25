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
          <h2>孫燕姿</h2>
          <h3>Stefanie Sun Yanzi</h3>
          <p>
            孫燕姿（Stefanie Sun Yanzi），1978年7月23日生於新加坡，新加坡華裔女歌手，
            畢業於南洋理工大學電機工程系。2000年出道，首張專輯《孫燕姿》即獲得廣泛關注，
            成為亞洲樂壇最具代表性的女聲之一。
          </p>
          <p>
            她的音樂跨越流行、搖滾、電子等多種風格，歷年來共推出十三張個人專輯，
            獲獎無數，包括金曲獎最佳國語女歌手等重要獎項。
          </p>
          <p>
            2017年發行第十三張專輯《跳舞的梵谷》，以「理智與瘋狂」為主題，
            展現了她對音樂更深刻的探索與詮釋。
          </p>
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
