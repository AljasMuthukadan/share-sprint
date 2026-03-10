import { Zap, Shield, Rocket } from "lucide-react";

function MobileFeatureCards() {
  return (
    <div className="lg:hidden mt-10 space-y-4">

      <div className="p-4 rounded-xl bg-white/70 backdrop-blur-md border border-white shadow">
        <div className="flex items-center gap-3">
          <Zap className="text-orange-500" size={20} />
          <div>
            <p className="font-semibold">Instant Transfer</p>
            <p className="text-sm opacity-70">
              Files move directly between devices.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white/70 backdrop-blur-md border border-white shadow">
        <div className="flex items-center gap-3">
          <Shield className="text-orange-500" size={20} />
          <div>
            <p className="font-semibold">Secure</p>
            <p className="text-sm opacity-70">
              Private room connection keeps files safe.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white/70 backdrop-blur-md border border-white shadow">
        <div className="flex items-center gap-3">
          <Rocket className="text-orange-500" size={20} />
          <div>
            <p className="font-semibold">No Login</p>
            <p className="text-sm opacity-70">
              Just share a code and start sending.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default MobileFeatureCards;