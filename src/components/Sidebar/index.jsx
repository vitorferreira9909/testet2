import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { CgHome } from "react-icons/cg";
import { MdOutlineExitToApp } from "react-icons/md";
import { GrDocumentTime } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SidebarStyle } from "./style.js";
import iconeContrasteBranco from "../../assets/contrasteIcon.png";

export function Sidebar({ logOut, windowSize }) {
  const [sideBarCollapse, setSideBarCollapse] = useState(true);
  const { darkThemeIsActive, handleTheme } = useContext(ThemeContext);

  function handleContrast() {
    handleTheme();
  }

  function handleFontSize(updateValue) {
    const selectors = "h1, h2, p, a, span, li, label, input, button";
    let elements = document.querySelectorAll(selectors);
    elements.forEach((element) => {
      let currentFontSize = window.getComputedStyle(element).fontSize;
      let newFontSize = parseInt(currentFontSize) + updateValue;
      element.style.fontSize = `${newFontSize}px`;
    });
  }

  const [outlineIsActive, setOutlineIsActive] = useState(false);
  function handleOutlineIsActive(event) {
    if (
      (event.nativeEvent instanceof KeyboardEvent && event.key === "Enter") ||
      event.nativeEvent instanceof PointerEvent
    ) {
      setOutlineIsActive(!outlineIsActive);
    }
  }

  useEffect(() => {
    const outlineStyle = "*:focus{outline: 5px solid var(--azul-primario)};";
    if (outlineIsActive) {
      let element = document.createElement("style");
      element.innerHTML = outlineStyle;
      document.head.insertAdjacentElement("beforeend", element);
      return;
    }

    let elements = document.querySelectorAll("style");
    elements.forEach((element) => {
      if (element.innerHTML === outlineStyle) {
        element.remove();
      }
    });
  }, [outlineIsActive]);

  //  const navigateTo = useNavigate();

  return (
    <Col className={windowSize >= 992 ? "px-0 col-1" : "px-0 col-0"}>
      <SidebarStyle collapse={sideBarCollapse}>
        <Row>
          <Col className="column-container">
            <div className="logo-area">
              {sideBarCollapse ? (
                <span>SGA</span>
              ) : (
                <span>Sistema de Gestão de Auditório</span>
              )}
            </div>
            <div className="collapse-sidebar-action">
              {sideBarCollapse ? (
                <div className="sidebar-nav">
                  <div className="mt-2 sidebar-nav-item"></div>
                  <div onClick={() => setSideBarCollapse(!sideBarCollapse)}>
                    <BsArrowBarRight title="Expandir" />
                  </div>
                  <span className="icon-label">Expandir</span>
                </div>
              ) : (
                <div className="sidebar-nav">
                  <div className="mt-2 sidebar-nav-item">
                    <div onClick={() => setSideBarCollapse(!sideBarCollapse)}>
                      <BsArrowBarLeft title="Retrair" />
                      <span className="label-sidebar">Retrair</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div id="container-botoes">
              <div>
                <button
                  id="diminuir"
                  className="btnAce"
                  aria-label="Diminuir tamanho do texto -A"
                  onClick={() => handleFontSize(-1)}
                >
                  -A
                </button>
              </div>
            </div>
            <div>
              <button
                className="btnAce"
                aria-label="Aumentar tamanho do texto +A"
                onClick={() => handleFontSize(1)}
              >
                +A
              </button>
            </div>

            <button
              className="btnAceC"
              aria-label="Ativar alto contraste"
              aria-pressed={darkThemeIsActive}
              onClick={handleContrast}
            >
              <div>
                <img
                  id="icone-contraste"
                  src={iconeContrasteBranco}
                  alt="Icone ilustrativo de alto contraste"
                />
              </div>
            </button>

            <div className="sidebar-nav">
              <div className="mt-2 sidebar-nav-item">
                <div onClick={() => navigateTo("/")}>
                  <div className="area-icons-label">
                    <CgHome title="Início" />

                    <span className="label-sidebar">Início</span>
                  </div>
                </div>
              </div>
              <div className="sidebar-nav-item">
                <div onClick={() => navigateTo("/pendentes")}>
                  <div className="area-icons-label">
                    <FaRegCalendarAlt title="Pendentes" />
                    <span className="label-sidebar">Pendentes</span>
                  </div>
                </div>
              </div>
              <div className="sidebar-nav-item">
                <div onClick={() => navigateTo("/historico")}>
                  <div className="area-icons-label">
                    <GrDocumentTime title="Histórico" />
                    <span className="label-sidebar">Histórico</span>
                  </div>
                </div>
              </div>
              <div className="sidebar-nav-item">
                <div onClick={() => navigateTo("/empresas")}>
                  <div className="area-icons-label">
                    <BsPersonWorkspace title="Empresas" />
                    <span className="label-sidebar">Empresas</span>
                  </div>
                </div>
              </div>
              <div className="sidebar-nav-item">
                <div>
                  <div className="area-icons-label">
                    <FaBell title="Notificações" />
                    <span className="label-sidebar">Notificações</span>
                  </div>
                </div>
              </div>
              <div className="sidebar-nav-item">
                <div>
                  <div className="area-icons-label">
                    <IoPersonCircleOutline title="Perfil" />
                    <span className="label-sidebar">Perfil</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar-nav">
              <div className="sidebar-nav-item">
                <div onClick={() => logOut()}>
                  <div className="area-icons-label">
                    <MdOutlineExitToApp title="Sair" />
                    <span className="label-sidebar">Sair</span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </SidebarStyle>
    </Col>
  );
}
export default Sidebar;
