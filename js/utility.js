function contractable(root) {
    const indicator = document.getElementById(root+"-indicator");
    const container = document.getElementById(root+"-container");
    return (isExpanded) => {
        container.classList.toggle("hidden", isExpanded);
        isExpanded = !isExpanded;
        indicator.textContent = isExpanded ? "expand_circle_up" : "expand_circle_down";
        return isExpanded;
    }
}