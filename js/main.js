document.addEventListener("DOMContentLoaded", function () {
  const calendarDays = document.getElementById("calendarDays");
  const monthYear = document.getElementById("monthYear");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  const eventos = [
    { data: "2025-07-17", titulo: "Reunião PET", descricao: "Discussão dos projetos do semestre." },
    { data: "2025-07-25", titulo: "Palestra sobre Engenharia", descricao: "Palestra com professor convidado." },
  ];

  let date = new Date();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function renderCalendar(currentDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay(); // dia da semana do 1º dia (0 = dom)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate(); // último dia do mês anterior

    let monthName = currentDate.toLocaleString("default", { month: "long" });
    monthName = capitalizeFirstLetter(monthName);
    monthYear.textContent = `${monthName} de ${year}`;

    calendarDays.innerHTML = "";

    // Sempre 5 linhas (7 dias cada) = 35 células
    const totalCells = 35;

    // Quantos dias do mês anterior mostrar
    const prevMonthDaysToShow = firstDay === 0 ? 6 : firstDay - 1; // Ajuste para domingo = 0

    // Dias do mês anterior
    for (let i = prevMonthDaysToShow; i > 0; i--) {
      const day = document.createElement("div");
      day.classList.add("calendar-day", "prev-month");
      day.textContent = daysInPrevMonth - i + 1;
      calendarDays.appendChild(day);
    }

    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      const day = document.createElement("div");
      day.classList.add("calendar-day");
      day.textContent = i;

      const today = new Date();
      if (
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        day.classList.add("today");
      }

      const dayString = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const eventoDoDia = eventos.find(e => e.data === dayString);
      if (eventoDoDia) {
        day.classList.add("has-event");
        day.style.cursor = "pointer";

        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip-text");
        tooltip.innerHTML = `<strong>${eventoDoDia.titulo}</strong><br>${eventoDoDia.descricao}`;
        day.appendChild(tooltip);
      }

      calendarDays.appendChild(day);
    }

    // Calcula quantos dias já foram mostrados (mês anterior + atual)
    const daysShown = prevMonthDaysToShow + daysInMonth;

    // Dias do próximo mês para completar 35 células
    const nextMonthDaysToShow = totalCells - daysShown;
    for (let i = 1; i <= nextMonthDaysToShow; i++) {
      const day = document.createElement("div");
      day.classList.add("calendar-day", "next-month");
      day.textContent = i;
      calendarDays.appendChild(day);
    }
  }

  prevBtn.addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar(date);
  });

  nextBtn.addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar(date);
  });

  renderCalendar(date);
});
