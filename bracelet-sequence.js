// bracelet-sequence.js (new image sequence)
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const canvas = document.getElementById("bracelet_sequence");
  const ctx = canvas.getContext("2d");

  const frames = [
    "https://s3.amazonaws.com/webflow-prod-assets/6900b05e22fa6d623ea8b94d/691def9d3c405535359c23c5_0001.avif",
    "https://s3.amazonaws.com/webflow-prod-assets/6900b05e22fa6d623ea8b94d/691def9d71a1ef6bea81d29d_0002.avif",
    "https://s3.amazonaws.com/webflow-prod-assets/6900b05e22fa6d623ea8b94d/691def9d73017ca40db14852_0003.avif",
    "https://s3.amazonaws.com/webflow-prod-assets/6900b05e22fa6d623ea8b94d/691def9de02a99ff97e9aec0_0004.avif",
    "https://s3.amazonaws.com/webflow-prod-assets/6900b05e22fa6d623ea8b94d/691def9d52bdc9d7a84c612d_0005.avif",
    "https://s3.amazonaws.com/webflow-prod-assets/6900b05e22fa6d623ea8b94d/691def9d555ee63290968b19_0006.avif",
    "https://s3.amazonaws.com/webflow-prod-assets/6900b05e22fa6d623ea8b94d/691def9dce99fd27643d232d_0007.avif",
    "https://s3.amazonaws.com/webflow-prod-assets/6900b05e22fa6d623ea8b94d/691def9da04c4f302c6b3340_0008.avif",
    "https://s3.amazonaws.com/webflow-prod-assets/6900b05e22fa6d623ea8b94d/691def9db8e596c5172dc56c_0009.avif",
    "https://s3.amazonaws.com/webflow-prod-assets/6900b05e22fa6d623ea8b94d/691def9dc1ff69483f433c5e_0010.avif"
  ];

  const images = [];
  const current = { frame: 0 };
  const frameCount = frames.length;

  // Pré-carrega todas as imagens
  frames.forEach(src => {
    const img = new Image();
    img.src = src;
    images.push(img);
  });

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function render() {
    const img = images[Math.floor(current.frame)];
    if (!img) return;

    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  gsap.to(current, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: ".bracelet_content",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      pin: ".bracelet_sequence-wrap",
      anticipatePin: 1,
      invalidateOnRefresh: true
    },
    onUpdate: render
  });

  images[0].onload = render;
});
