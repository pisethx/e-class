import React, { useContext } from 'react'
import { useQuery, useLazyQuery } from 'react-apollo'
import { MY_NOTIFICATIONS_QUERY } from 'constants/user'
import { AuthContext } from 'contexts/auth'

// reactstrap components
import { DropdownToggle, DropdownMenu, DropdownItem, NavLink, Spinner } from 'reactstrap'

const Notifications = () => {
  const authContext = useContext(AuthContext)
  const { data, loading, error } = useQuery(MY_NOTIFICATIONS_QUERY)

  if (loading) return <Spinner />
  if (error) return <p>Error</p>

  return (
    <>
      <DropdownToggle caret color="default" data-toggle="dropdown" nav>
        {authContext.user.unreadNotificationsCount > 0 && <div className="notification d-none d-lg-block d-xl-block" />}
        <i className="tim-icons icon-sound-wave" />
        <p className="d-lg-none">Notifications</p>
      </DropdownToggle>
      <DropdownMenu className="dropdown-navbar" right tag="ul">
        {data?.myNotifications &&
          (data.myNotifications.length !== 0 ? (
            data.myNotifications.map((noti) => (
              <NavLink tag="li" href={noti.data.url}>
                <DropdownItem className="nav-item" active={noti.is_read ? false : true}>
                  {noti.data.message}
                </DropdownItem>
              </NavLink>
            ))
          ) : (
            <NavLink tag="li">
              <DropdownItem className="nav-item">No notification yet!</DropdownItem>
            </NavLink>
          ))}
      </DropdownMenu>
    </>
  )
}

export default Notifications
