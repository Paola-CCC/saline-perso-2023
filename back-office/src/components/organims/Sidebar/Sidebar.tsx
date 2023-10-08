import { FC, useEffect } from 'react';
import './Sidebar.scss';
import { Link, useLocation } from 'react-router-dom';
import { useGoNavigate } from '../../../hooks/Navigation';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {

  const { goTo } = useGoNavigate();
  const location = useLocation();
  let path = location.pathname.split('/');
  let currentPath = Array.from(path) && Array.from(path)[0] === '' 
  ? Array.from(path)[1] 
  : 'empty';



  const handleOpenPanel = () => {
    let tabCourseSettings : string[] = ["courses","instruments","categories","composers"];
    let btnCourse = document.getElementById("course-settings");

    let tabUsersSettings : string[] = ["professors","students","entreprise"];
    let btnUser = document.getElementById("user-settings");

   let btnhomepage = document.getElementById("homepage-datas");
   let btnForum = document.getElementById("forum-settings");

    if(tabCourseSettings.includes(currentPath) && btnCourse){
      btnCourse.classList.add("active");
    } else if(!tabCourseSettings.includes(currentPath) && btnCourse ){
      btnCourse.classList.remove("active");
    }

    if(tabUsersSettings.includes(currentPath) && btnUser){
      btnUser.classList.add("active");
    } else if(!tabUsersSettings.includes(currentPath) && btnUser ){
      btnUser.classList.remove("active");
    }

    if(tabCourseSettings.includes(currentPath) && btnCourse){
      btnCourse.classList.add("active");
    } else if(!tabCourseSettings.includes(currentPath) && btnCourse ){
      btnCourse.classList.remove("active");
    }

    if( currentPath === 'forum' && btnForum ){
      btnForum.classList.add("active");
    } else if(currentPath !== 'forum' && btnForum ){
      btnForum.classList.remove("active");
    }

    if( currentPath === 'homepage' && btnhomepage ){
      btnhomepage.classList.add("active");
    } else if(currentPath !== 'homepage' && btnhomepage ){
      btnhomepage.classList.remove("active");
    }
  };

  const addClassActive = (path : string ) => {
    goTo(path,3 );
  };

  useEffect(() => {
    handleOpenPanel();

  })



  return (
    <div className="sidebar-container" data-testid="Sidebar">
    <h1> LOGO</h1>

    <ul className="sidebar-list">

        <li className="sidebar-item">
          <button 
            className="accordion" 
            id='homepage-datas' 
            onClick={(e)=> addClassActive('/homepage')}
          > 
            Tableau de bord
          </button>
        </li>

        <li className="sidebar-item">
          <button className="accordion" id='course-settings' >Aprrentissage</button>
          <ul className="panel">
            <li className="sidebar-item-nested">
                <Link className="link-sidebar" to="/courses">Cours</Link>
            </li>
            <li className="sidebar-item-nested">
              <Link className="link-sidebar" to="/instruments">Instruments</Link>
            </li>

            <li className="sidebar-item-nested">
                <Link className="link-sidebar" to="/categories">Categories</Link>
            </li>
            <li className="sidebar-item-nested">
                <Link className="link-sidebar" to="/composers">Compositeurs</Link>
            </li>
          </ul>
        </li>

        <li className="sidebar-item">
          <button className="accordion" id='user-settings'  >Gestion des Utilisateurs</button>
          <ul className="panel">
            <li className="sidebar-item-nested">
                <Link className="link-sidebar" to="/professors">Professeurs</Link>
            </li>
            <li className="sidebar-item-nested">
              <Link className="link-sidebar" to="/students">Élèves</Link>
            </li>
            <li className="sidebar-item-nested">
              <Link className="link-sidebar" to="/entreprise">Équipe entreprise</Link>
            </li>
          </ul>
        </li>

        <li className="sidebar-item">
          <button 
          className="accordion" 
          id='forum-settings'  
          onClick={(e)=> addClassActive('/forum')} 
        > 
          Forum
          </button>
        </li>
    </ul>
  </div>

  )

};

export default Sidebar;
