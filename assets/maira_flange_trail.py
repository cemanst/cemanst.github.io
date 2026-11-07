"""Draw the simulated MAiRA flange trajectory as an RViz line."""
from math import dist

import rclpy
from geometry_msgs.msg import Point
from rclpy.node import Node
from rclpy.time import Time
from tf2_ros import Buffer, TransformException, TransformListener
from visualization_msgs.msg import Marker


class FlangeTrail(Node):
    def __init__(self):
        super().__init__("maira_flange_trail")
        self.buffer = Buffer()
        self.listener = TransformListener(self.buffer, self)
        self.publisher = self.create_publisher(Marker, "/maira/flange_trail", 10)
        self.points = []
        self.create_timer(1 / 30, self.publish_trail)

    def publish_trail(self):
        root = "maira7M_root_link"
        try:
            translation = self.buffer.lookup_transform(
                root, "maira7M_flange", Time()
            ).transform.translation
        except TransformException:
            return

        current = (translation.x, translation.y, translation.z)
        if not self.points or dist(current, self.points[-1]) >= 0.002:
            self.points.append(current)
            self.points = self.points[-3000:]

        marker = Marker()
        marker.header.frame_id = root
        marker.ns = "flange_trail"
        marker.type = Marker.LINE_STRIP
        marker.action = Marker.ADD
        marker.pose.orientation.w = 1.0
        marker.scale.x = 0.009
        marker.color.r = 0.05
        marker.color.g = 0.78
        marker.color.b = 0.96
        marker.color.a = 1.0
        marker.points = [Point(x=x, y=y, z=z) for x, y, z in self.points]
        self.publisher.publish(marker)


def main():
    rclpy.init()
    node = FlangeTrail()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()


if __name__ == "__main__":
    main()

