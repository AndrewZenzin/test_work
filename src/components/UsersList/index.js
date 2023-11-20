import React, {useState, useEffect} from 'react';
import {Preloader} from "../Preloader";
import {Exist} from "../Exist"
import {Link, useSearchParams} from "react-router-dom";
import {media} from "../../assets/css/media";
import searchIcon from "../../assets/images/icons/search.svg";
import chevronDown from "../../assets/images/icons/chevron-down.svg"
import chevronUp from "../../assets/images/icons/chevron-up.svg"
import {filter as _filter, orderBy} from "lodash";

import styled from "styled-components";


const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  margin: 0 auto;
  @media (max-width: ${media.tablet}) {
    padding: 0
  }
`;

const List = styled.div`
  border-radius: 2px;
  padding: 0;
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-left: 20px;
  }
`;


const ListItem = styled.div`
  display: flex;
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(odd) {
    background: #999;

    &:hover {
      background: rgba(153, 153, 153, 0.90);
    }

    .test {
      color: #fff;
    }
  }

  &:nth-child(even) {
    background: #f5f5f5;

    &:hover {
      background: #DADADAE5;
    }
  }
`;

const UserInfo = styled.div`
  flex: 3;
  margin-left: 20px;
  @media (max-width: ${media.tablet}) {
    max-width: 50%;
    overflow: scroll;
    margin-left: 5px;
  }
`;

const UserInfoPostLink = styled(UserInfo)`
  text-align: center;
  flex: 1;
`;

const UserInfoAlbumLink = styled(UserInfo)`
  flex: none;
  text-align: center;
  flex: 1;
`;

const UserName = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 16px;
  @media (max-width: ${media.tablet}) {
    font-size: 16px;
  }
`;

const ContentLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`;

const UsersListHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 60px;
`;

const HeaderItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #000;
  color: #777;
  font-size: 18px;
  font-weight: bold;
  padding: 0 20px;

`;

const SearchInput = styled.input`
  appearance: none;
  background: transparent;
  border: 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;
  position: relative;
  padding: 4px 4px 4px 29px;
  background-image: url(${searchIcon});
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: 0;
    background-color: #373940;
    border-radius: 0.25rem;
  }
`;
const HeaderItemSearch = styled(HeaderItem)`
  flex-direction: row;
  justify-content: flex-end;
  padding: 8px;
`;

const OrderIcon = styled.img`
  height: 14px;
  width: 14px;
  -webkit-filter: invert(100%); /* safari 6.0 - 9.0 */
  filter: invert(100%);
  margin-left: 5px;
`;
const HeaderItemLink = styled.div`
  cursor: pointer;
`
export function UsersList() {
    const [users, setUsers] = useState([]);
    const [visibleUsers, setVisibleUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [searchParam, setSearchParam] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const [order, setOrder] = useState(false);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((json) => {
                setUsers(json);
                if (searchParams.has("un")) {
                    const urlSearch = searchParams.get('un');
                    const filteredUsers = _filter(json, (user) => user.username.toLowerCase()
                        .includes(urlSearch.trim().toLowerCase()));
                    setVisibleUsers(filteredUsers);
                } else {
                    setVisibleUsers(json);
                }

            })
            .catch(error => console.error(error));

        if (searchParams.has("un")) {
            const searchParam = searchParams.get('un');
            setSearchParam(searchParam);
        }

    }, []);

    useEffect(() => {
        if (!visibleUsers || (!visibleUsers.length && !searchParam)) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [visibleUsers, searchParam]);


    useEffect(() => {
        let filteredUsers;
        if (!searchParam) {
            filteredUsers = users;
        } else {
            filteredUsers = _filter(users, (user) => user.username.toLowerCase()
                .includes(searchParam.trim().toLowerCase()));
        }
        if (order){
            setVisibleUsers(orderBy(filteredUsers, ['username'], [order]));
        } else {
            setVisibleUsers(filteredUsers);
        }
    }, [searchParam, order, users]);
    const  updateOrder = () => {
        if (!order) {
            setOrder('asc');
            setSearchParams(params => {
                params.set("order",'asc');
                return params;
            });
            return;
        }
        if (order === 'asc') {
            setOrder('desc');
            setSearchParams(params => {
                params.set("order",'desc');
                return params;
            });

            return;
        }
        if (order === 'desc') {
            setOrder('asc');
            setSearchParams(params => {
                params.set("order",'asc');
                return params;
            });
        }
    };

    return (
        <ListWrapper>
            <UsersListHeader>
                <HeaderItem>
                    <HeaderItemLink onClick={updateOrder}>
                        Username
                    </HeaderItemLink>
                    <Exist when={order}>
                        <OrderIcon src={order === 'asc' ? chevronUp: chevronDown} style={{filter: "invert(1)"}}/>
                    </Exist>
                </HeaderItem>
                <HeaderItemSearch>
                    <SearchInput
                        type="search" placeholder="Search.."
                        value={searchParam}
                        onChange={(e) => {
                            setSearchParam(e.target.value);
                            setSearchParams(params => {
                                params.set('un', e.target.value);
                                return params;
                            });
                        }}
                        name="search"/>
                </HeaderItemSearch>
            </UsersListHeader>
            {isLoading ? (
                    <Preloader/>
                ) :
                (
                    <List>
                        {visibleUsers && visibleUsers.map(user => (
                            <ListItem key={user.id}>
                                <UserInfo>
                                    <UserName>{user.username}</UserName>
                                </UserInfo>
                                <UserInfoPostLink>
                                    <ContentLink to={`/users-posts/${user.id}`} >
                                        Posts
                                    </ContentLink>
                                </UserInfoPostLink>
                                <UserInfoAlbumLink>
                                    <ContentLink to={`/users-albums/${user.id}`}>
                                        Albums
                                    </ContentLink>
                                </UserInfoAlbumLink>
                            </ListItem>

                        ))}
                    </List>
                )
            }

        </ListWrapper>
    );

}

export default UsersList;
