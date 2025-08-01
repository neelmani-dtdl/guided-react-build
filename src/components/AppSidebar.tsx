import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Brain,
  AlertTriangle,
  Settings,
  Search,
  TrendingUp,
  Database,
  MessageSquare,
  Shield,
  Bot
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: BarChart3 },
  { title: 'Employees', url: '/employees', icon: Users },
  { title: 'AI Insights', url: '/insights', icon: Brain },
  { title: 'Analytics', url: '/analytics', icon: TrendingUp },
  { title: 'Alerts & Nudges', url: '/alerts', icon: AlertTriangle },
  { title: 'NLP Queries', url: '/queries', icon: MessageSquare },
  { title: 'AI Assistant', url: '/chatbot', icon: Bot },
  { title: 'Data Sources', url: '/sources', icon: Database },
  { title: 'Access Control', url: '/access', icon: Shield },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? 'bg-primary text-primary-foreground font-medium shadow-md' 
      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground';

  return (
    <Sidebar className={collapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        {/* Logo/Brand Section */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg text-primary">People Team</h2>
                <p className="text-xs text-muted-foreground">AI-Powered Platform</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats in Sidebar */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t">
            <div className="bg-muted/30 rounded-lg p-3">
              <h4 className="text-sm font-medium text-foreground mb-2">Quick Stats</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Employees</span>
                  <span className="font-medium">1,198</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Engagement</span>
                  <span className="font-medium text-success">82%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">At Risk</span>
                  <span className="font-medium text-warning">89</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}