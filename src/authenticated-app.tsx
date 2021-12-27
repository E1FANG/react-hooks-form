import styled from "@emotion/styled"
import { Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import { ReactComponent as Logo } from 'assets/logo.svg'
import { Button, Dropdown, Menu } from "antd"

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <Logo width={'3rem'} height={'3rem'} color={'rgb(38,132,255)'}></Logo>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <PageHeader>
          <Dropdown overlay={<Menu>
            <Menu.Item key={'logout'}>
              <Button type={"link"} onClick={logout}>登出</Button>
            </Menu.Item>
          </Menu>}>
            <Button type={"link"} onClick={e => e.preventDefault()}>
              Hi,{user?.name}
            </Button>
          </Dropdown>
        </PageHeader>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)`
`

const Container = styled.div``

const PageHeader = styled.header`
/* background-color: gray;
height: 6rem; */
`

const Main = styled.main`
/* height: calc(100vh - 6rem); */
`