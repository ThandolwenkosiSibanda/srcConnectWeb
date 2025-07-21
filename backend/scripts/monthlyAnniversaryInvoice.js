import { createClient } from "@supabase/supabase-js";

// Load from environment or config
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to get today's day (e.g., 21 for July 21)
const getTodayDay = () => new Date().getDate();

async function generateMonthlyAnniversaryInvoices() {
  const todayDay = getTodayDay();

  console.log(`Running monthly invoice job for day: ${todayDay}`);

  // Step 1: Get all active policies whose start_date matches today's day
  const { data: policies, error: policyError } = await supabase
    .from("policies")
    .select("*")
    .eq("is_active", true);

  if (policyError) {
    console.error("Error fetching policies:", policyError);
    return;
  }

  const duePolicies = policies.filter((policy) => {
    const startDate = new Date(policy.start_date);
    return startDate.getDate() === todayDay;
  });

  console.log(`Found ${duePolicies.length} policies due today.`);

  // Step 2: Generate an invoice for each due policy
  for (const policy of duePolicies) {
    const invoicePayload = {
      policy_id: policy.id,
      amount: policy.monthly_premium,
      status: "unpaid",
      issued_at: new Date().toISOString(),
    };

    const { error: invoiceError } = await supabase
      .from("invoices")
      .insert([invoicePayload]);

    if (invoiceError) {
      console.error(
        `Failed to create invoice for policy ${policy.id}:`,
        invoiceError
      );
    } else {
      console.log(`Invoice created for policy ${policy.id}`);
    }
  }

  console.log("Monthly anniversary invoice job completed.");
}

// Run the script if executed directly (node monthlyAnniversaryInvoice.js)
if (require.main === module) {
  generateMonthlyAnniversaryInvoices().catch(console.error);
}
