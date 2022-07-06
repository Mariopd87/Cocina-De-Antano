function UserMenu(props) {
  const { user } = props.user;

  return (
    <div>
        <p>Hola {user.nombre}</p>
    </div>
  );
}

export default UserMenu;
