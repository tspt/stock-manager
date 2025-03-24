// 这里可以扩展守卫逻辑，比如权限校验等
const RouteGuard = ({ children }: GuardProps) => {
  // 示例：简单的访问日志
  console.log('Route accessed:', window.location.pathname)

  return <>{children}</>
}

export default RouteGuard
