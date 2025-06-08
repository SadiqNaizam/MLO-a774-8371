import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"; // Assuming Form is from shadcn

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  avatarUrl: z.string().url("Invalid URL.").optional().or(z.literal("")),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(8, "Password must be at least 8 characters."),
    newPassword: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters."),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match",
    path: ["confirmPassword"],
});

const preferencesSchema = z.object({
  darkMode: z.boolean(),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
});

const SettingsPage = () => {
  console.log('SettingsPage loaded');

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Admin User",
      email: "admin@example.com",
      avatarUrl: "https://via.placeholder.com/100/007bff/ffffff.png?text=AU",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const preferencesForm = useForm<z.infer<typeof preferencesSchema>>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      darkMode: false,
      emailNotifications: true,
      smsNotifications: false,
    },
  });

  const onProfileSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log("Profile updated:", values);
    // API call to update profile
  };

  const onPasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
    console.log("Password change requested:", values);
    // API call to change password
  };
  
  const onPreferencesSubmit = (values: z.infer<typeof preferencesSchema>) => {
    console.log("Preferences updated:", values);
    // API call to update preferences
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col flex-1 md:pl-64">
        <NavigationMenu />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
            <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                <Card>
                    <CardHeader>
                    <CardTitle>Account Profile</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                            <FormField
                                control={profileForm.control}
                                name="avatarUrl"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-center">
                                        <Avatar className="h-24 w-24 mb-2">
                                            <AvatarImage src={field.value || "https://via.placeholder.com/100/007bff/ffffff.png?text=AU"} alt={profileForm.getValues("fullName")} />
                                            <AvatarFallback>{profileForm.getValues("fullName")?.substring(0,2).toUpperCase() || 'AU'}</AvatarFallback>
                                        </Avatar>
                                        <FormControl>
                                            <Input placeholder="Avatar URL" {...field} className="text-center" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={profileForm.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={profileForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <Button type="submit">Save Profile</Button>
                        </form>
                    </Form>
                    </CardContent>
                </Card>
                </TabsContent>

                <TabsContent value="password">
                <Card>
                    <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your account password.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                            <FormField
                                control={passwordForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl><Input type="password" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl><Input type="password" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl><Input type="password" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Update Password</Button>
                        </form>
                    </Form>
                    </CardContent>
                </Card>
                </TabsContent>

                <TabsContent value="preferences">
                <Card>
                    <CardHeader>
                    <CardTitle>Dashboard Preferences</CardTitle>
                    <CardDescription>Customize your dashboard experience.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Form {...preferencesForm}>
                        <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
                             <FormField
                                control={preferencesForm.control}
                                name="darkMode"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Dark Mode</FormLabel>
                                            <FormDescription>Enable dark theme for the dashboard.</FormDescription>
                                        </div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={preferencesForm.control}
                                name="emailNotifications"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Email Notifications</FormLabel>
                                            <FormDescription>Receive important updates via email.</FormDescription>
                                        </div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={preferencesForm.control}
                                name="smsNotifications"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>SMS Notifications</FormLabel>
                                            <FormDescription>Receive critical alerts via SMS.</FormDescription>
                                        </div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Save Preferences</Button>
                        </form>
                    </Form>
                    </CardContent>
                </Card>
                </TabsContent>
            </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;