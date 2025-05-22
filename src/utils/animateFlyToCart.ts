// ฟังก์ชันที่เรียกใช้ตอนกดเพิ่ม
export const animateFlyToCart = (
    startRef: HTMLDivElement,
    cartRef: HTMLDivElement
) => {
    const img = startRef.cloneNode(true) as HTMLDivElement;
    img.style.position = "fixed";
    img.style.zIndex = "9999";
    img.style.pointerEvents = "none";
    img.style.borderRadius = "8px";
    img.style.transformOrigin = "center center";

    const start = startRef.getBoundingClientRect();
    const end = cartRef.getBoundingClientRect();

    img.style.top = `${start.top}px`;
    img.style.left = `${start.left}px`;
    img.style.width = `${start.width}px`;
    img.style.height = `${start.height}px`;

    document.body.appendChild(img);

    const deltaX = end.left + end.width / 2 - (start.left + start.width / 2);
    const deltaY = end.top + end.height / 2 - (start.top + start.height / 2);

    img.animate(
        [
            { transform: "translate(0px, 0px) scale(1)", opacity: 1 },
            { transform: `translate(${deltaX * 0.7}px, ${deltaY + 300}px) scale(0.3)`, opacity: 1 },
            { transform: `translate(${deltaX}px, ${deltaY}px) scale(0.1)`, opacity: 0 },
        ],
        {
            duration: 800,
            easing: "ease-in-out",
        }
    ).onfinish = () => {
        document.body.removeChild(img);
    };
};
