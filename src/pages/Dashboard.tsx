import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, BarChart3, Book, Code2, GitCompare, BookOpen } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value }: { icon: React.ComponentType<{ className?: string }>, title: string, value: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass-panel p-6 hover:shadow-amber-500/20"
  >
    <div className="flex items-center space-x-4">
      <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
        <Icon className="h-6 w-6 text-amber-500" />
      </div>
      <div>
        <h3 className="text-sm text-gray-400">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </motion.div>
);

const LearningPathCard = ({ title, description, progress }: { title: string, description: string, progress: number }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass-panel p-6 hover:shadow-amber-500/20"
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <div className="relative h-2 bg-black/30 rounded-full overflow-hidden">
      <div 
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
    <div className="mt-2 text-sm text-gray-400 text-right">{progress}% Complete</div>
  </motion.div>
);

const AchievementCard = ({ icon: Icon, title, description }: { icon: React.ComponentType<{ className?: string }>, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass-panel p-6 hover:shadow-amber-500/20"
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-amber-500" />
      </div>
      <h3 className="font-bold">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8"
        >
          {/* Header */}
          <div className="glass-panel p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                <Code2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gold-text">Welcome back, Developer!</h1>
                <p className="text-gray-400">Continue your learning journey</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Trophy} title="Total Points" value="2,450" />
            <StatCard icon={Flame} title="Current Streak" value="7 days" />
            <StatCard icon={BarChart3} title="Completion Rate" value="85%" />
            <StatCard icon={Book} title="Lessons Completed" value="24" />
          </div>

          {/* Learning Paths */}
          <div className="grid md:grid-cols-2 gap-6">
            <LearningPathCard
              title="Python Mastery"
              description="Master Python from basics to advanced concepts with hands-on projects."
              progress={65}
            />
            <LearningPathCard
              title="JavaScript Advanced"
              description="Deep dive into modern JavaScript and popular frameworks."
              progress={42}
            />
          </div>

          {/* Recent Achievements */}
          <div className="glass-panel p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Trophy className="h-6 w-6 text-amber-500 mr-2" />
              Recent Achievements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AchievementCard
                icon={Flame}
                title="7-Day Streak!"
                description="You've been coding consistently for a week. Keep it up!"
              />
              <AchievementCard
                icon={BookOpen}
                title="Python Basics"
                description="Completed the Python fundamentals course with 95% score."
              />
              <AchievementCard
                icon={GitCompare}
                title="Code Master"
                description="Successfully completed 50 coding challenges."
              />
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="glass-panel p-8">
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {[
                { time: '2 hours ago', action: 'Completed Python Basics Quiz', score: '95%' },
                { time: '5 hours ago', action: 'Finished JavaScript Challenge', score: '100%' },
                { time: 'Yesterday', action: 'Started React Course', score: null }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.time}</p>
                  </div>
                  {activity.score && (
                    <div className="text-amber-500 font-bold">{activity.score}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;