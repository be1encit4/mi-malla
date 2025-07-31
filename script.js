const mallaCurricular = {
      "I Ciclo": {
        "Introducción al Análisis Matemático": { creditos: 4, prereqs: [] },
        "Álgebra y Geometría": { creditos: 4, prereqs: [] },
        "Física General": { creditos: 4, prereqs: [] },
        "Pensamiento Lógico Matemático": { creditos: 3, prereqs: [] },
        "Lectura Crítica y Redacción de Textos Académicos": { creditos: 3, prereqs: [] },
        "Desarrollo Personal": { creditos: 3, prereqs: [] },
        "Taller I": { creditos: 1, prereqs: [] }
      },
      "II Ciclo": {
        "Análisis Matemático": { creditos: 4, prereqs: [] },
        "Estadística General": { creditos: 4, prereqs: [] },
        "Física I": { creditos: 3, prereqs: ["Introducción al Análisis Matemático"] },
        "Física Experimental I": { creditos: 2, prereqs: [] },
        "Sociedad, Cultura y Ecología": { creditos: 3, prereqs: [] },
        "Ética, Convivencia Humana y Ciudadanía": { creditos: 3, prereqs: [] },
        "Cultura Investigativa y Pensamiento Crítico": { creditos: 3, prereqs: [] },
        "Taller II": { creditos: 1, prereqs: [] }
      },
      "III Ciclo": {
        "Análisis Matemático I": { creditos: 5, prereqs: ["Análisis Matemático"] },
        "Álgebra Lineal": { creditos: 5, prereqs: ["Álgebra y Geometría"] },
        "Física II": { creditos: 5, prereqs: ["Análisis Matemático", "Física I"] },
        "Física Experimental II": { creditos: 2, prereqs: ["Física I", "Física Experimental I"] },
        "Química": { creditos: 5, prereqs: [] }
      },
      "IV Ciclo": {
        "Análisis Matemático II": { creditos: 5, prereqs: ["Análisis Matemático I"] },
        "Física Matemática I": { creditos: 5, prereqs: ["Álgebra Lineal"] },
        "Física III": { creditos: 5, prereqs: ["Análisis Matemático I", "Física II"] },
        "Física Experimental III": { creditos: 2, prereqs: ["Física II", "Física Experimental II"] },
        "Introducción a la Programación": { creditos: 5, prereqs: [] }
      },
      "V Ciclo": {
        "Física Matemática II": { creditos: 5, prereqs: ["Física Matemática I", "Análisis Matemático II"] },
        "Mecánica Clásica": { creditos: 6, prereqs: ["Física Matemática I", "Física III"] },
        "Física IV": { creditos: 5, prereqs: ["Análisis Matemático II", "Física III"] },
        "Física Experimental IV": { creditos: 2, prereqs: ["Física III", "Física Experimental III"] },
        "Física Computacional": { creditos: 5, prereqs: ["Introducción a la Programación", "Física III"] }
      },
      "VI Ciclo": {
        "Física Matemática III": { creditos: 5, prereqs: ["Física Matemática II"] },
        "Electromagnetismo I": { creditos: 5, prereqs: ["Física Matemática II", "Mecánica Clásica"] },
        "Mecánica Cuántica I": { creditos: 5, prereqs: ["Física Matemática II", "Física IV"] },
        "Electrónica I": { creditos: 5, prereqs: ["Física III", "Física Experimental III"] },
        "Historia de la Física": { creditos: 2, prereqs: [] }
      },
      "VII Ciclo": {
        "Mecánica Estadística y Termodinámica": { creditos: 5, prereqs: ["Mecánica Cuántica I"] },
        "Electromagnetismo II": { creditos: 5, prereqs: ["Electromagnetismo I"] },
        "Mecánica Cuántica II": { creditos: 5, prereqs: ["Mecánica Cuántica I"] },
        "EE2": { creditos: 4, prereqs: [] },
        "EE1": { creditos: 3, prereqs: [] }
      },
      "VIII Ciclo": {
        "Física de Materiales I": { creditos: 5, prereqs: ["Mecánica Estadística y Termodinámica", "Electromagnetismo II"] },
        "Física del Estado Sólido": { creditos: 5, prereqs: ["Mecánica Estadística y Termodinámica"] },
        "Física Nuclear": { creditos: 5, prereqs: ["Electromagnetismo II"] },
        "Instrumentación Científica": { creditos: 4, prereqs: ["Electrónica I", "Física Experimental IV"] },
        "EE3": { creditos: 4, prereqs: [] },
        "EE1": { creditos: 3, prereqs: [] }
      },
      "IX Ciclo": {
        "Tesis I": { creditos: 6, prereqs: [] },
        "EE4": { creditos: 4, prereqs: [] },
        "EE5": { creditos: 4, prereqs: [] },
        "Electivo Libre 1": { creditos: 4, prereqs: [] },
        "Didáctica de la Física": { creditos: 3, prereqs: ["Física IV"] }
      },
      "X Ciclo": {
        "Tesis II": { creditos: 8, prereqs: ["Tesis I"] },
        "Electivo Libre 2": { creditos: 4, prereqs: [] },
        "Práctica Pre Profesional": { creditos: 10, prereqs: [] }
      }
    };

    const mallaDiv = document.getElementById("malla");
    let estadoCursos = {};

    if (localStorage.getItem("estadoCursos")) {
      estadoCursos = JSON.parse(localStorage.getItem("estadoCursos"));
    }

    function guardarEstado() {
      localStorage.setItem("estadoCursos", JSON.stringify(estadoCursos));
    }

    function puedeDesbloquear(nombre) {
      for (const ciclo in mallaCurricular) {
        if (nombre in mallaCurricular[ciclo]) {
          return mallaCurricular[ciclo][nombre].prereqs.every(pre => estadoCursos[pre]);
        }
      }
      return false;
    }

    function renderMalla() {
  const tablaCiclos = document.getElementById("tablaCiclos");

  // Guardar la posición horizontal del scroll antes de actualizar
  const scrollX = tablaCiclos.scrollLeft;

  tablaCiclos.innerHTML = "";

  for (const ciclo in mallaCurricular) {
    const columna = document.createElement("div");
    columna.classList.add("columna-ciclo");

    const titulo = document.createElement("h2");
    titulo.textContent = ciclo;
    titulo.className = "ciclo";
    columna.appendChild(titulo);

    for (const nombre in mallaCurricular[ciclo]) {
      const cursoData = mallaCurricular[ciclo][nombre];
      const btn = document.createElement("div");
      btn.classList.add("curso");

      if (estadoCursos[nombre]) {
        btn.classList.add("aprobado");
      } else if (!puedeDesbloquear(nombre)) {
        btn.classList.add("bloqueado");
      }

      const nombreEl = document.createElement("div");
      nombreEl.textContent = nombre;
      nombreEl.className = "nombre-curso";

      const creditosEl = document.createElement("div");
      creditosEl.textContent = `${cursoData.creditos} créditos`;
      creditosEl.className = "creditos";

      btn.appendChild(nombreEl);
      btn.appendChild(creditosEl);

      btn.onmousedown = (e) => e.preventDefault();

      btn.onclick = () => {
        if (btn.classList.contains("bloqueado")) return;
        estadoCursos[nombre] = !estadoCursos[nombre];
        guardarEstado();
        renderMalla();
      };

      columna.appendChild(btn);
    }

    tablaCiclos.appendChild(columna);
  }

  // Restaurar el scroll horizontal justo después de renderizar
  requestAnimationFrame(() => {
    tablaCiclos.scrollLeft = scrollX;
  });
}

    renderMalla();
