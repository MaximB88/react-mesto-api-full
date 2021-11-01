function ImagePopup(props) {
    return(
        <article className={`popup popup_type_show ${props.data ? "popup_opened" : ""}`}>
          <div className="popup__container popup__container_type_show">
              <button className="popup__close-button popup__close-button_type_show" onClick={props.onClose}></button>
              <img src={props.data.link} alt={props.data.name} className="popup__photo" />
              <p className="popup__description">{props.data.name}</p>
          </div>
      </article>
    )
}

export default ImagePopup;