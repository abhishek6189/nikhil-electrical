import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, MessageSquare, LogOut, Home, Clock, 
  CheckCircle, XCircle, AlertCircle, RefreshCw 
} from "lucide-react";
import logo from "@/assets/logo.png";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  preferred_date: string;
  preferred_time: string;
  description: string | null;
  status: string;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  new: "bg-blue-100 text-blue-800",
  replied: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-800",
};

const AdminDashboard = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<"appointments" | "contacts">("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [isLoading, user, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [appointmentsRes, contactsRes] = await Promise.all([
        supabase.from("appointments").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      ]);

      if (appointmentsRes.data) setAppointments(appointmentsRes.data);
      if (contactsRes.data) setContacts(contactsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setLoadingData(false);
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      toast({ title: "Updated", description: `Appointment marked as ${status}` });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      toast({ title: "Updated", description: `Contact marked as ${status}` });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-center max-w-md p-8 bg-card rounded-xl border border-border">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have admin access. Please contact the administrator to get access.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button onClick={handleSignOut} variant="secondary">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Nikhil Electrical" className="w-10 h-10 object-contain" />
              <div>
                <div className="font-bold text-foreground">Admin Dashboard</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Button onClick={fetchData} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Button onClick={handleSignOut} variant="secondary" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{appointments.length}</div>
                <div className="text-sm text-muted-foreground">Total Appointments</div>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {appointments.filter(a => a.status === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{contacts.length}</div>
                <div className="text-sm text-muted-foreground">Contact Messages</div>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {appointments.filter(a => a.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "appointments"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-muted"
            }`}
          >
            <Calendar className="w-4 h-4 inline-block mr-2" />
            Appointments ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "contacts"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-muted"
            }`}
          >
            <MessageSquare className="w-4 h-4 inline-block mr-2" />
            Contact Messages ({contacts.length})
          </button>
        </div>

        {/* Content */}
        {loadingData ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        ) : activeTab === "appointments" ? (
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No appointments yet</p>
              </div>
            ) : (
              appointments.map((appointment) => (
                <div key={appointment.id} className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{appointment.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[appointment.status] || statusColors.pending}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Email:</strong> {appointment.email}</p>
                        <p><strong>Phone:</strong> {appointment.phone}</p>
                        {appointment.company && <p><strong>Company:</strong> {appointment.company}</p>}
                        <p><strong>Service:</strong> {appointment.service}</p>
                        <p><strong>Date:</strong> {new Date(appointment.preferred_date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {appointment.preferred_time}</p>
                        {appointment.description && <p><strong>Description:</strong> {appointment.description}</p>}
                        <p className="text-xs text-muted-foreground mt-2">
                          Submitted: {new Date(appointment.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["pending", "confirmed", "completed", "cancelled"].map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          variant={appointment.status === status ? "default" : "outline"}
                          disabled={updatingId === appointment.id}
                          onClick={() => updateAppointmentStatus(appointment.id, status)}
                          className="capitalize"
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No contact messages yet</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div key={contact.id} className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{contact.subject}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[contact.status] || statusColors.new}`}>
                          {contact.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>From:</strong> {contact.name}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                        <p className="mt-2"><strong>Message:</strong></p>
                        <p className="bg-muted p-3 rounded-lg">{contact.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Submitted: {new Date(contact.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["new", "replied", "archived"].map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          variant={contact.status === status ? "default" : "outline"}
                          disabled={updatingId === contact.id}
                          onClick={() => updateContactStatus(contact.id, status)}
                          className="capitalize"
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
